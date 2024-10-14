// import FollowersData from '@/components/localstorageDeployFiles/FollowersData';
import dynamic from "next/dynamic";
const FollowersData = dynamic(()=> import('@/components/localstorageDeployFiles/FollowersData'),{ssr:false})

const FollowersPage: React.FC = () => {
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
        {/* Render the extracted FollowersList component here */}
        <FollowersData />
      </table>
    </div>
  );
};

export default FollowersPage;
