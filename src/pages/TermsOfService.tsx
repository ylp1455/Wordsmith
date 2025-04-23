import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  // Get current date for the "Last Updated" section
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-6">
          <FileText className="h-12 w-12 text-indigo-600 mr-4" />
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        </div>
        <p className="text-center text-gray-600">
          Last Updated: {currentDate}
        </p>
      </div>

      {/* Introduction */}
      <div className="prose prose-indigo max-w-none mb-12">
        <p>
          Welcome to Wordsmith. Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Wordsmith website and service (the "Service") operated by Azriel Tech Labs ("us", "we", "our").
        </p>
        <p>
          Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
        </p>
        <p>
          <strong>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</strong>
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><a href="#account-terms" className="text-indigo-600 hover:text-indigo-800">Account Terms</a></li>
          <li><a href="#subscription-billing" className="text-indigo-600 hover:text-indigo-800">Subscription and Billing</a></li>
          <li><a href="#content-ownership" className="text-indigo-600 hover:text-indigo-800">Content Ownership and Licensing</a></li>
          <li><a href="#acceptable-use" className="text-indigo-600 hover:text-indigo-800">Acceptable Use Policy</a></li>
          <li><a href="#privacy-data" className="text-indigo-600 hover:text-indigo-800">Privacy and Data Protection</a></li>
          <li><a href="#termination" className="text-indigo-600 hover:text-indigo-800">Termination</a></li>
          <li><a href="#limitation-liability" className="text-indigo-600 hover:text-indigo-800">Limitation of Liability</a></li>
          <li><a href="#disclaimer" className="text-indigo-600 hover:text-indigo-800">Disclaimer</a></li>
          <li><a href="#changes-terms" className="text-indigo-600 hover:text-indigo-800">Changes to Terms</a></li>
          <li><a href="#contact-us" className="text-indigo-600 hover:text-indigo-800">Contact Us</a></li>
        </ol>
      </div>

      {/* Terms Sections */}
      <div className="space-y-12">
        {/* Account Terms */}
        <section id="account-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Account Terms</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              You must be at least 18 years of age to use this Service. You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.
            </p>
            <p>
              Your login credentials are for your personal use only. You are responsible for maintaining the security of your account and password. Wordsmith cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
            </p>
            <p>
              You are responsible for all content posted and activity that occurs under your account, even when content is posted by others who have access to your account.
            </p>
            <p>
              You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>
          </div>
        </section>

        {/* Subscription and Billing */}
        <section id="subscription-billing" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Subscription and Billing</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              Some features of the Service require a subscription. By selecting a subscription plan, you agree to pay Wordsmith the monthly or annual subscription fees indicated for that service.
            </p>
            <p>
              Subscription fees are not refundable. There will be no refunds or credits for partial months of service, or for periods in which your account remains open but you do not use the Service.
            </p>
            <p>
              The Service is billed in advance on a monthly or annual basis, depending on the type of subscription you select. All charges are automatically charged to the payment method you provided during registration.
            </p>
            <p>
              For any upgrade or downgrade in plan level, your payment method will automatically be charged the new rate on your next billing cycle. Downgrading your Service may cause the loss of features or capacity of your account.
            </p>
          </div>
        </section>

        {/* Content Ownership */}
        <section id="content-ownership" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Content Ownership and Licensing</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              You retain all rights to any content you upload, submit, or create through the Service. By uploading content, you grant Wordsmith a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and process that content solely for the purpose of providing the Service to you.
            </p>
            <p>
              The content generated by the Service based on your inputs belongs to you. You are free to use, modify, distribute, and create derivative works from this content.
            </p>
            <p>
              Wordsmith does not claim any ownership rights in any content generated by the Service for you. However, we may use anonymized data about how the Service is used to improve our algorithms and service quality.
            </p>
            <p>
              You are solely responsible for ensuring that the content you create with the Service does not infringe on the intellectual property rights of others.
            </p>
          </div>
        </section>

        {/* Acceptable Use */}
        <section id="acceptable-use" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Generate, upload, or distribute content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, or otherwise objectionable;</li>
              <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
              <li>Generate content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party;</li>
              <li>Transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware;</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service;</li>
              <li>Generate spam, chain letters, or other mass unsolicited mailings;</li>
              <li>Collect or store personal data about other users without their consent.</li>
            </ul>
            <p>
              Wordsmith reserves the right to terminate your access to the Service immediately, without prior notice, if we determine that you have violated these Terms.
            </p>
          </div>
        </section>

        {/* Privacy and Data */}
        <section id="privacy-data" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your personal information.
            </p>
            <p>
              By using the Service, you consent to our collection and use of personal data as outlined in our Privacy Policy.
            </p>
            <p>
              We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
            </p>
          </div>
        </section>

        {/* Termination */}
        <section id="termination" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section id="limitation-liability" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              In no event shall Wordsmith, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ol>
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
            </ol>
            <p>
              In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed, our liability shall be limited to the maximum extent permitted by law.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section id="disclaimer" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p>
              Wordsmith, its subsidiaries, affiliates, and licensors do not warrant that:
            </p>
            <ol>
              <li>The Service will function uninterrupted, secure, or available at any particular time or location;</li>
              <li>Any errors or defects will be corrected;</li>
              <li>The Service is free of viruses or other harmful components; or</li>
              <li>The results of using the Service will meet your requirements.</li>
            </ol>
            <p>
              The content generated by the Service is created by artificial intelligence and may not always be accurate, complete, or suitable for your specific needs. You are responsible for reviewing and verifying all content generated by the Service before use.
            </p>
          </div>
        </section>

        {/* Changes to Terms */}
        <section id="changes-terms" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
            </p>
            <p>
              Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new terms, please stop using the Service.
            </p>
            <p>
              It is your responsibility to review these Terms periodically for changes. We recommend checking this page regularly for any updates.
            </p>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact-us" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
          <div className="prose prose-indigo max-w-none">
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@wordsmith.com<br />
              <strong>Address:</strong> 123 Innovation Drive, Suite 400, San Francisco, CA 94103
            </p>
          </div>
        </section>
      </div>

      {/* Disclaimer Notice */}
      <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">Important Notice</h3>
            <p className="text-yellow-700">
              This Terms of Service document is provided as a template and should be reviewed by a legal professional before use. It may not cover all legal requirements for your specific business or jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
