// import axios from 'axios';
// import { showAlert } from './alerts';
// import { loadStripe } from '@stripe/stripe-js';

// const stripe = loadStripe(
//   'pk_test_51NW2PnLc9ZIrNwllopqWhOwxDfbkCIN4HdkGi8KNNbaOfEHGlchL3zHzwAfd3gvCQqUopp7EVglwbWuAdq7ONS6y009tZ0UIpb'
// );

// export const bookTour = async (tourId) => {
//   try {
//     const session = await axios(
//       `http://127.0.0.1:3000/api/v1/bookings/${tourId}`
//     );

//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id,
//     });
//   } catch (err) {
//     showAlert('error', err.message);
//   }
// };
