import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

export default function App() {
  return (
    <Suspense fallback={<p>Loading Spline...</p>}>
      <Spline scene="https://prod.spline.design/AI14e68A0QEnMr7W/scene.splinecode" />
    </Suspense>
  );
}
