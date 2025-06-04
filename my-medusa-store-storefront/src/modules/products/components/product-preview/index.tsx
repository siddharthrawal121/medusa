import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper" className="bg-neutral-light border border-grey-200 rounded-md p-4 group-hover:shadow-lg group-hover:border-grey-300 transition-all duration-300 ease-in-out h-full flex flex-col justify-between">
        <div>
          <div className="overflow-hidden"> {/* Added for containing the scale effect */}
            <div className="group-hover:scale-105 transition-transform duration-300 ease-in-out">
              <Thumbnail
                thumbnail={product.thumbnail}
                images={product.images}
              />
            </div>
          </div>
          <div className="flex txt-compact-medium mt-4 justify-between items-start">
            <Text className="font-serif text-lg text-primary group-hover:text-secondary" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between items-start">
            <Text className="font-serif text-lg text-primary group-hover:text-secondary" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between items-start">
            <Text className="font-serif text-lg text-primary group-hover:text-secondary" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
