// import FollowingData from '@/components/localstorageDeployFiles/FollowingData';

import dynamic from "next/dynamic";
const FollowingData = dynamic(()=> import('@/components/localstorageDeployFiles/FollowingData'),{ssr:false})

const FollowingPage: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-3/4 border-collapse table-auto">
        <thead>
          <tr className="bg-gray-300 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        {/* Render the extracted FollowingList component here */}
        <FollowingData />
      </table>
    </div>
  );
};

export default FollowingPage;
