import './globals.css'; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import CloudSpinnerGrid from '../components/CloudSpinnerGrid'; // Import the CloudSpinnerGrid component

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md text-sm font-semibold">
        0.125 = ⅛ portion
      </div>
      <h1 className="text-2xl mb-4">Vile Parle, Mumbai!</h1>

      {/* Ensure CloudSpinnerGrid takes full width */}
      <div className="w-full px-5">
        <CloudSpinnerGrid />
      </div>
    </div>
  );
};

export default Page;
