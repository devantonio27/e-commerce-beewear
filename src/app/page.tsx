import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6 lg:space-y-10">
        <div className="px-5 lg:px-20 xl:px-40">
          <Image
            src="/banner01.svg"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-none lg:rounded-2xl"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5 lg:px-20 xl:px-40">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5 lg:px-20 xl:px-40">
          <Image
            src="/banner02.svg"
            alt="Seja autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-none lg:rounded-2xl"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
