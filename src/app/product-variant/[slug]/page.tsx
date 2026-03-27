import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6 lg:space-y-10">
        <div className="lg:flex lg:gap-10 lg:px-20 xl:px-40">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="100vw"
              height={0}
              width={0}
              className="h-auto w-full rounded-3xl object-cover lg:sticky lg:top-6"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6 lg:w-1/2 lg:py-0">
            <div className="px-5 lg:px-0">
              <VariantSelector
                selectedVariant={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>
            <div className="px-5 lg:px-0">
              <h2 className="text-lg font-semibold">
                {productVariant.product.name}{" "}
              </h2>
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}{" "}
              </h3>
              <h3 className="text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="px-5 lg:px-0">
              <p className="text-sm">{productVariant.product.description} </p>
            </div>
          </div>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
