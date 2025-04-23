import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Save, AlertCircle, Send, Download } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Textarea from '../components/UI/Textarea';
import Select from '../components/UI/Select';
import FileUpload from '../components/UI/FileUpload';
import { useAuth } from '../context/AuthContext';
import { generateArticle, parseUploadedPdf } from '../services/articleService';
import { saveArticle } from '../lib/supabase';
import { ArticleOptions } from '../types';

const ArticleWriter: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<ArticleOptions>({
    tone: 'formal',
    style: 'article',
    length: 500,
  });

  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePdfUpload = async (file: File | null) => {
    setPdfFile(file);
    setError(null);

    if (file) {
      try {
        const content = await parseUploadedPdf(file);
        setPdfContent(content);
      } catch (err) {
        console.error('Error parsing PDF:', err);
        setError('Could not parse the PDF file. Please try another file.');
        setPdfContent(null);
      }
    } else {
      setPdfContent(null);
    }
  };

  const handleToneChange = (tone: string) => {
    setOptions((prev) => ({ ...prev, tone: tone as ArticleOptions['tone'] }));
  };

  const handleStyleChange = (style: string) => {
    setOptions((prev) => ({ ...prev, style: style as ArticleOptions['style'] }));
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(e.target.value);
    setOptions((prev) => ({ ...prev, length: isNaN(length) ? 500 : length }));
  };

  const handleGenerateArticle = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt for your article.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsGenerating(true);

    try {
      const article = await generateArticle(pdfContent, prompt, options);
      setGeneratedArticle(article);

      // Extract a title from the prompt if no title is set
      if (!title) {
        const promptWords = prompt.split(' ');
        setTitle(
          promptWords.length > 5
            ? `${promptWords.slice(0, 5).join(' ')}...`
            : prompt
        );
      }
    } catch (err) {
      console.error('Error generating article:', err);
      setError('An error occurred while generating the article. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = async () => {
    if (!user) {
      navigate('/auth', { state: { returnTo: '/writer' } });
      return;
    }

    if (!generatedArticle) {
      setError('Please generate an article first.');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title for your article.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const { error } = await saveArticle(title, generatedArticle, user.id);

      if (error) {
        throw new Error(error.message);
      }

      setSuccessMessage('Article saved successfully!');

      // Reset after short delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error saving article:', err);
      setError('An error occurred while saving the article. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyContent = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle);
      setSuccessMessage('Content copied to clipboard!');

      // Reset after short delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const handleDownloadContent = () => {
    if (generatedArticle) {
      const element = document.createElement('a');
      const file = new Blob([generatedArticle], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${title || 'article'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wordsmith Article Writer</h1>
            <p className="mt-2 text-gray-600">
              Upload reference documents, set your preferences, and generate high-quality articles
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Input Section */}
          <Card>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FileText size={20} className="text-indigo-600" />
                Input & Preferences
              </h2>

              <div className="space-y-6">
                <FileUpload
                  label="Upload a PDF document (optional)"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                />

                <Textarea
                  label="Your writing prompt"
                  placeholder="Describe what you want the AI to write about..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  fullWidth
                  rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    label="Tone"
                    options={[
                      { value: 'formal', label: 'Formal' },
                      { value: 'informal', label: 'Informal' },
                      { value: 'persuasive', label: 'Persuasive' },
                      { value: 'academic', label: 'Academic' },
                      { value: 'conversational', label: 'Conversational' },
                    ]}
                    value={options.tone}
                    onChange={handleToneChange}
                    fullWidth
                  />

                  <Select
                    label="Style"
                    options={[
                      { value: 'essay', label: 'Essay' },
                      { value: 'article', label: 'Article' },
                      { value: 'report', label: 'Report' },
                      { value: 'blog', label: 'Blog Post' },
                      { value: 'technical', label: 'Technical' },
                    ]}
                    value={options.style}
                    onChange={handleStyleChange}
                    fullWidth
                  />

                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                      Length (words)
                    </label>
                    <input
                      type="range"
                      id="length"
                      min="200"
                      max="2000"
                      step="100"
                      value={options.length}
                      onChange={handleLengthChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Short (200)</span>
                      <span>{options.length} words</span>
                      <span>Long (2000)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={handleGenerateArticle}
                    isLoading={isGenerating}
                    disabled={!prompt.trim() || isGenerating}
                    leftIcon={<Send size={18} />}
                    fullWidth
                  >
                    {isGenerating ? 'Generating...' : 'Generate Article'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Output Section */}
          {(generatedArticle || isGenerating) && (
            <Card>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Generated Article</h2>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyContent}
                      disabled={!generatedArticle || isGenerating}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download size={16} />}
                      onClick={handleDownloadContent}
                      disabled={!generatedArticle || isGenerating}
                    >
                      Download
                    </Button>
                  </div>
                </div>

                <Input
                  label="Article Title"
                  placeholder="Enter a title for your article"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  disabled={isGenerating}
                />

                {isGenerating ? (
                  <div className="border rounded-md p-4 min-h-[300px] flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600">Generating your article...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                  </div>
                ) : (
                  <div className="border rounded-md p-4 min-h-[300px]">
                    <div className="prose prose-indigo max-w-none">
                      {generatedArticle?.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line.startsWith('# ') ? (
                            <h1 className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>
                          ) : line.startsWith('## ') ? (
                            <h2 className="text-xl font-semibold mb-3 mt-6">{line.replace('## ', '')}</h2>
                          ) : line.trim() === '' ? (
                            <br />
                          ) : (
                            <p className="mb-4">{line}</p>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Button
                    onClick={handleSaveArticle}
                    isLoading={isSaving}
                    disabled={!generatedArticle || isGenerating || isSaving}
                    variant="primary"
                    leftIcon={<Save size={18} />}
                    fullWidth
                  >
                    Save Article
                  </Button>
                  {!user && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      You'll need to sign in to save your article
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
              <div className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5">✓</div>
              <p className="text-green-700">{successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleWriter;