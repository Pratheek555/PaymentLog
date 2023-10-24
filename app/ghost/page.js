import razorpay from "../components/razorpay";

export default async function page() {
  const options = {
    from: 1696957251,
    to: 1697648451,
    count: 100,
    description: "SJBHY",
  };
  let payments = await razorpay.payments.all(options);
  console.log(payments);
  return <h1>{JSON.stringify(payments)}</h1>;
}
