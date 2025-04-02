import './globals.css'; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import CloudSpinnerGrid from '../components/CloudSpinnerGrid'; // Import the CloudSpinnerGrid component

const Page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <h1 className="text-2xl mb-4">Hello, World!</h1>

      {/* Ensure CloudSpinnerGrid takes full width */}
      <div className="w-full px-5">
        <CloudSpinnerGrid />
      </div>
    </div>
  );
};

export default Page;
