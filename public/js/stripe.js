import axios from 'axios';
import { showAlert } from './alerts';

// import Stripe from 'stripe';

// const stripe = new Stripe(
//   'pk_test_51NW2PnLc9ZIrNwllopqWhOwxDfbkCIN4HdkGi8KNNbaOfEHGlchL3zHzwAfd3gvCQqUopp7EVglwbWuAdq7ONS6y009tZ0UIpb'
// );

// let stripePromise;

// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(
//       'pk_test_51NW2PnLc9ZIrNwllopqWhOwxDfbkCIN4HdkGi8KNNbaOfEHGlchL3zHzwAfd3gvCQqUopp7EVglwbWuAdq7ONS6y009tZ0UIpb'
//     );
//   }

//   return stripePromise;
// };

// let stripe;
// try {
//   stripe = Stripe(
//     'pk_test_51NW2PnLc9ZIrNwllopqWhOwxDfbkCIN4HdkGi8KNNbaOfEHGlchL3zHzwAfd3gvCQqUopp7EVglwbWuAdq7ONS6y009tZ0UIpb'
//   );
// } catch (err) {
//   alert(err);
// }

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });

    window.location.replace(session.data.session.url);
  } catch (err) {
    showAlert('error', err.message);
  }
};
