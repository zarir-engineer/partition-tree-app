import './globals.css'; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import CloudSpinnerGrid from '../components/CloudSpinnerGrid'; // Import the CloudSpinnerGrid component

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Hello, World!</h1>

      {/* Render the CloudSpinnerGrid component */}
      <CloudSpinnerGrid />
    </div>
  );
};

export default Page;
