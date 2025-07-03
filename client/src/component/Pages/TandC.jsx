import React from 'react'

const TandC = () => {
  return (
    <section className="bg-bgColor">
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32">
      {/* Header Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 mx-auto w-full sm:w-11/12 md:w-10/12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-merriweather text-center">Terms And Conditions</h1>
        <p className="text-sm sm:text-sm md:text-base lg:text-lg font-medium mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-inter">
        Welcome to Ticketeer!, These Terms and Conditions govern the use of our event ticketing platform. By accessing or using our Platform, you agree to be bound by these Terms.
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
        {/* Subheading */}
        <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-merriweather font-semibold px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24">
          Please, read the terms and conditions carefully
        </h2>

        {/* Terms Paragraphs */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <p className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg">
              <span className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                1. Acceptance of Terms:
              </span>{" "}
              By accessing or using our event ticketing application, you agree to these terms. If you do not agree,
              please do <span className='font-bold'>NOT</span> use the service.
            </p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                2. Account Registration
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>You must provide accurate, complete, and up-to-date information when creating an account.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>We reserve the right to suspend or terminate accounts that provide false information.</li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                3. Ticket Purchase and Payment
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>All ticket sales are final. No refunds, exchanges, or cancellations are permitted unless stated otherwise.</li>
                <li>Payments must be made through the available payment options on our Platform. We are not responsible for transaction failures due to third-party payment providers.</li>
                <li>Service fees, taxes, and additional charges may apply to ticket purchases.</li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                4. Event Policies and Organizer Responsibilities
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>The event organizer is solely responsible for event management, including scheduling, venue regulations, and entry requirements.</li>
                <li>
                We are not liable for any event cancellations, rescheduling, or changes. Refunds (if applicable) will be subject to the event organizer’s refund policy.
                </li>
                <li>Entry to the event may require compliance with health and safety protocols set by the event organizer.</li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                5. User Responsibilities
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li> You must provide accurate and complete information when purchasing tickets.</li>
                <li>
                Reselling or transferring tickets may be restricted by the event organizer’s policy. Unauthorized resale may result in ticket cancellation.
                </li>
                <li>You agree to comply with all applicable laws and regulations while using our Platform.</li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                6. Limitation of Liability
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>We are not responsible for lost, stolen, or damaged tickets.</li>
                <li>
                We are not liable for any injuries, damages, or losses that occur before, during, or after an event.
                </li>
                <li>Our liability is limited to the amount paid for the ticket in dispute.</li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                7. Intellectual Property
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>All content, trademarks, and intellectual property on the Platform belong to the Company or its licensors.</li>
                <li>
                You may not reproduce, distribute, or modify any content from the Platform without prior written consent.
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                8. Privacy and Data Protection
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>By using our Platform, you agree to our Privacy Policy regarding the collection and use of personal data.</li>
                <li>
                We implement security measures to protect user data but do not guarantee complete security against unauthorized access.
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                9. Amendments and Termination
              </p>
              <ul className="font-bodyFont text-xs sm:text-sm md:text-base lg:text-lg space-y-1 sm:space-y-2 list-disc pl-4 sm:pl-5 md:pl-6">
                <li>We reserve the right to update or modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised Terms.</li>
                <li>
                We may suspend or terminate access to the Platform for users who violate these Terms.
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className="font-headerFont font-bold text-sm sm:text-base md:text-lg lg:text-xl">
              10. Contact Information
              </p>
                <p>For any questions or concerns regarding these Terms, please contact us at <span className='text-orange-500 hover:text-orange-700'>ticketeer@gmail.com</span></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default TandC