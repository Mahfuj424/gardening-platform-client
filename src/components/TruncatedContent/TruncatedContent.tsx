/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { getUserInfo } from "@/services/authServices";
import { useGetSingleProfileQuery } from "@/redux/api/userApi";

const TruncatedContent: React.FC<{ item: any }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const userInfo = getUserInfo();
const {data}=useGetSingleProfileQuery(userInfo?._id)
const userData = data?.data
console.log(userData)

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  // Mutation for creating a payment
  const [createPayment] = useCreatePaymentMutation();

  // Function to handle the payment
  const handlePayment = async () => {
    const paymentObject = {
      totalAmount: 150.75,
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
    };
    try {
      const res = await createPayment(paymentObject).unwrap();
      window.location.href = res?.data?.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if the content is more than 1 line
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const lineHeight = parseFloat(window.getComputedStyle(contentRef.current).lineHeight);
      if (contentHeight > lineHeight) {
        setIsTruncated(true);
      }
    }
  }, [item]);

  // Toggle expand/collapse and check user verification and premium status
  const toggleExpand = () => {
    if (isTruncated) {
      if (item?.isPremium && !userData?.isVerified) {
        // If item is premium and user is not verified, show modal
        setShowModal(true);
      } else if (userData?.isVerified && item?.isPremium) {
        // If both are true, allow expanding
        setIsExpanded(!isExpanded);
      } else {
        // If neither is premium nor verified, simply show the content
        setIsExpanded(!isExpanded);
      }
    }
  };

  // Modal Component
  const PremiumModal = ({ onClose, onYes }:any) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold">Premium Access Required</h2>
        <p>You need to complete the payment to access this premium content.</p>
        <div className="flex justify-between mt-4">
          <button className="text-gray-500" onClick={onClose}>Cancel</button>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={onYes}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className={`dark:text-white ${isExpanded ? "" : "line-clamp-1"}`}
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(item?.content),
        }}
      />
      {isTruncated && (
        <button className="text-green-600 font-semibold" onClick={toggleExpand}>
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}

      {/* Modal for premium access */}
      {showModal && (
        <PremiumModal 
          onClose={() => setShowModal(false)} 
          onYes={() => {
            handlePayment(); // Call handlePayment when user confirms
            setShowModal(false); // Close the modal after payment handling
          }}
        />
      )}
    </div>
  );
};

export default TruncatedContent;
