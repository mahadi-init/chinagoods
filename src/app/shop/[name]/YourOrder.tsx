export default function YourOrder() {
  return (
    <div>
      <p className="text-xl font-semibold">Your order</p>

      <div className="my-6">
        <div className="flex justify-between font-semibold">
          <p>Product</p>
          <p>Subtotal</p>
        </div>

        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex w-full justify-between">
          <p>Product</p>
          <p>720</p>
        </div>
        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>720.00</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free Shipping</p>
          </div>
        </div>

        <hr className="my-4 border-[0.1rem] border-dashed border-gray-400" />

        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>720.00</p>
        </div>
      </div>
    </div>
  );
}
