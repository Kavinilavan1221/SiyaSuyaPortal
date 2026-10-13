import { ProductForm } from "../product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Add New Product</h1>
        <p className="text-muted-foreground">
          Fill in the details below to add a new product to your catalog.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
