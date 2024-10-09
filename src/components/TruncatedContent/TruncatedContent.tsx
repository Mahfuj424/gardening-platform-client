/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import DOMPurify from "dompurify";

const TruncatedContent: React.FC<{ item: any }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null); // Specify the type for contentRef

  useEffect(() => {
    // Check if the content is more than 1 line
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight; // Access scrollHeight safely
      const lineHeight = parseFloat(window.getComputedStyle(contentRef.current).lineHeight);
      if (contentHeight > lineHeight) {
        setIsTruncated(true);
      }
    }
  }, [item]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
    </div>
  );
};

export default TruncatedContent;
