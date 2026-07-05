import type { RegistryCardVM } from "@/lib/application";
import { ProductCard, type ProductCardLabels } from "./ProductCard";

type ProjectListProps = {
  products: RegistryCardVM[];
  labels: {
    regionLabel: string;
    card: ProductCardLabels;
  };
  statusLabels: Record<string, string>;
};

export function ProjectList({
  products,
  labels,
  statusLabels,
}: ProjectListProps) {
  return (
    <section className="ds-registry-list" aria-label={labels.regionLabel}>
      <ol className="ds-registry-list-items">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            statusLabel={statusLabels[product.status] ?? product.status}
            labels={labels.card}
            staggerIndex={index}
          />
        ))}
      </ol>
    </section>
  );
}
