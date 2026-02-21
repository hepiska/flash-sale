import type { Connection } from "mongoose"
import { Types } from "mongoose"

import { FlashSaleModel } from "../modules/flashSale/flashSale.model"
import { ProductModel } from "../modules/product/product.model"

type ProductSeed = {
  name: string
  slug: string
  description: string
  imageUrl: string
  totalStock: number
  price: number
}

type FlashSaleSeed = {
  title: string
  description: string
  imageUrl: string
  offsetHours: number
  durationHours: number
  products: ProductSeed[]
}

const flashSaleSeedData: FlashSaleSeed[] = [
  {
    title: "Sunrise Gadget Rush",
    description: "Early morning tech essentials to kickstart the day",
    imageUrl: "https://images.example.com/flash-sales/sunrise.jpg",
    offsetHours: 0,
    durationHours: 3,
    products: [
      {
        name: "Aurora Noise Cancelling Buds",
        slug: "aurora-noise-cancelling-buds",
        description: "Pocket-sized ANC earbuds with 30-hour battery life",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        totalStock: 60,
        price: 20,
      },
      {
        name: "Lumen Fitness Band",
        slug: "lumen-fitness-band",
        description: "Sleep, stress, and VO2 tracking in one band",
        imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
        totalStock: 70,
        price: 20,
      },
      {
        name: "Pulse Mini Drone",
        slug: "pulse-mini-drone",
        description: "Indoor-friendly drone with 4K stabilised camera",
        imageUrl: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f",
        totalStock: 35,
        price: 20,
      },
      {
        name: "Nimbus Portable Charger",
        slug: "nimbus-portable-charger",
        description: "20k mAh PD power bank that fits anywhere",
        imageUrl: "https://images.unsplash.com/photo-1609091839311-d536819bc148",
        totalStock: 80,
        price: 20,
      },
      {
        name: "Solstice Smart Mug",
        slug: "solstice-smart-mug",
        description: "Self-heating ceramic mug with mobile presets",
        imageUrl: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6",
        totalStock: 40,
        price: 20,
      },
    ],
  },
  {
    title: "Lunch Break Essentials",
    description: "Quick deals for hybrid workers between meetings",
    imageUrl: "https://images.example.com/flash-sales/lunch-break.jpg",
    offsetHours: 4,
    durationHours: 2,
    products: [
      {
        name: "Tempo Mechanical Keyboard",
        slug: "tempo-mechanical-keyboard",
        description: "Hot-swappable 65% board with gasket mount feel",
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        totalStock: 45,
        price: 20,
      },
      {
        name: "Orbit Travel Monitor",
        slug: "orbit-travel-monitor",
        description: "Portable 14-inch OLED with dual USB-C",
        imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6",
        totalStock: 50,
        price: 20,
      },
      {
        name: "Quill Smart Pen",
        slug: "quill-smart-pen",
        description: "Digitises notes across paper notebooks instantly",
        imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd",
        totalStock: 65,
        price: 20,
      },
      {
        name: "Flux Desk Mat",
        slug: "flux-desk-mat",
        description: "Wireless charging vegan leather desk mat",
        imageUrl: "https://images.unsplash.com/photo-1616410202998-38501e52504a",
        totalStock: 75,
        price: 20,
      },
      {
        name: "Halo Conference Light",
        slug: "halo-conference-light",
        description: "Keylight with auto white balance for remote calls",
        imageUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        totalStock: 55,
        price: 20,
      },
    ],
  },
  {
    title: "Dusk Home Upgrade",
    description: "Smart-home bundles tailored for evening routines",
    imageUrl: "https://images.example.com/flash-sales/dusk-home.jpg",
    offsetHours: 8,
    durationHours: 4,
    products: [
      {
        name: "Glow Pathway Lights",
        slug: "glow-pathway-lights",
        description: "Solar-powered pathway system with mesh controls",
        imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091bb18c",
        totalStock: 70,
        price: 20,
      },
      {
        name: "Pulse Air Purifier Mini",
        slug: "pulse-air-purifier-mini",
        description: "Compact purifier ideal for bedrooms and offices",
        imageUrl: "https://images.unsplash.com/photo-1585771724684-2626fc45475d",
        totalStock: 60,
        price: 20,
      },
      {
        name: "Nestle Smart Diffuser",
        slug: "nestle-smart-diffuser",
        description: "App-controlled scent diffusion with schedules",
        imageUrl: "https://images.unsplash.com/photo-1602928321679-560bb453f190",
        totalStock: 45,
        price: 20,
      },
      {
        name: "Mesa Ambient Speaker",
        slug: "mesa-ambient-speaker",
        description: "360-degree speaker with ambient light ring",
        imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        totalStock: 55,
        price: 20,
      },
      {
        name: "Iris Doorbell Cam",
        slug: "iris-doorbell-cam",
        description: "Battery doorbell camera with radar motion alerts",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827",
        totalStock: 50,
        price: 20,
      },
    ],
  },
  {
    title: "Night Owl Creator Kit",
    description: "Late-night creative tools for editors and streamers",
    imageUrl: "https://images.example.com/flash-sales/night-owl.jpg",
    offsetHours: 14,
    durationHours: 3,
    products: [
      {
        name: "Prism Capture Card",
        slug: "prism-capture-card",
        description: "4K60 external capture with low-latency passthrough",
        imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf",
        totalStock: 80,
        price: 20,
      },
      {
        name: "Lyric Podcast Mic",
        slug: "lyric-podcast-mic",
        description: "Broadcast mic with onboard DSP profiles",
        imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
        totalStock: 65,
        price: 20,
      },
      {
        name: "Canvas Macro Pad",
        slug: "canvas-macro-pad",
        description: "Programmable 12-key pad with per-key displays",
        imageUrl: "https://images.unsplash.com/photo-1618335829737-2228915674e0",
        totalStock: 70,
        price: 20,
      },
      {
        name: "Halo Stream Bar",
        slug: "halo-stream-bar",
        description: "RGB light bar synced to OBS scenes",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        totalStock: 75,
        price: 20,
      },
      {
        name: "Vibe Studio Headphones",
        slug: "vibe-studio-headphones",
        description: "Reference cans with planar magnetic drivers",
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
        totalStock: 55,
        price: 20,
      },
    ],
  },
  {
    title: "Weekend Warrior Drop",
    description: "Adventure-ready gear for spontaneous getaways",
    imageUrl: "https://images.example.com/flash-sales/weekend-warrior.jpg",
    offsetHours: 20,
    durationHours: 5,
    products: [
      {
        name: "Boulder Solar Speaker",
        slug: "boulder-solar-speaker",
        description: "Waterproof speaker with detachable solar lid",
        imageUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3",
        totalStock: 60,
        price: 20,
      },
      {
        name: "Atlas Trail Watch",
        slug: "atlas-trail-watch",
        description: "Dual-band GPS watch with offline topo maps",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        totalStock: 50,
        price: 20,
      },
      {
        name: "Summit Power Lantern",
        slug: "summit-power-lantern",
        description: "Rechargeable lantern that doubles as power bank",
        imageUrl: "https://images.unsplash.com/photo-1510007684149-1698246d8847",
        totalStock: 65,
        price: 20,
      },
      {
        name: "Glide Travel Scooter",
        slug: "glide-travel-scooter",
        description: "Foldable e-scooter ideal for campgrounds",
        imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc",
        totalStock: 35,
        price: 20,
      },
      {
        name: "Terra Purifier Bottle",
        slug: "terra-purifier-bottle",
        description: "UV-C water bottle with motion reminders",
        imageUrl: "https://images.unsplash.com/photo-1602143393494-710f816358ee",
        totalStock: 80,
        price: 20,
      },
    ],
  },
]

const SIX_MONTHS_IN_MS = 6 * 30 * 24 * 60 * 60 * 1000

const buildFlashSalesPayload = () => {
  const baseStart = new Date()
  baseStart.setMinutes(0, 0, 0)

  return flashSaleSeedData.map((seed) => {
    const saleId = new Types.ObjectId()
    const startTime = new Date(baseStart.getTime() + seed.offsetHours * SIX_MONTHS_IN_MS)
    const endTime = new Date(startTime.getTime() + seed.durationHours * SIX_MONTHS_IN_MS)
    const totalStock = seed.products.reduce((sum, product) => sum + product.totalStock, 0)

    const saleDoc = {
      _id: saleId,
      title: seed.title,
      description: seed.description,
      imageUrl: seed.imageUrl,
      totalStock,
      remainingStock: totalStock,
      startTime,
      endTime,
      isActive: true,
    }

    const products = seed.products.map((product) => ({
      _id: new Types.ObjectId(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      imageUrl: product.imageUrl,
      totalStock: product.totalStock,
      price: product.price,
      remainingStock: product.totalStock,
      saleId,
      isActive: true,
    }))

    return { saleDoc, products }
  })
}

const getFlashSaleModel = (connection: Connection) =>
  connection.model(FlashSaleModel.modelName, FlashSaleModel.schema)

const getProductModel = (connection: Connection) =>
  connection.model(ProductModel.modelName, ProductModel.schema)

export async function up(connection: Connection): Promise<void> {
  const flashSalesPayload = buildFlashSalesPayload()
  const flashSaleDocs = flashSalesPayload.map((item) => item.saleDoc)
  const productDocs = flashSalesPayload.flatMap((item) => item.products)

  const titles = flashSaleSeedData.map((seed) => seed.title)
  const FlashSale = getFlashSaleModel(connection)
  const Product = getProductModel(connection)
  const existingSales = await FlashSale.find({ title: { $in: titles } }, { _id: 1 }).lean()

  if (existingSales.length) {
    const existingIds = existingSales.map((sale) => sale._id)
    await Product.deleteMany({ saleId: { $in: existingIds } })
    await FlashSale.deleteMany({ _id: { $in: existingIds } })
  }

  await FlashSale.insertMany(flashSaleDocs)
  await Product.insertMany(productDocs)
}

export async function down(connection: Connection): Promise<void> {
  const titles = flashSaleSeedData.map((seed) => seed.title)
  const FlashSale = getFlashSaleModel(connection)
  const Product = getProductModel(connection)
  const existingSales = await FlashSale.find({ title: { $in: titles } }, { _id: 1 }).lean()

  if (!existingSales.length) {
    return
  }

  const existingIds = existingSales.map((sale) => sale._id)
  await Product.deleteMany({ saleId: { $in: existingIds } })
  await FlashSale.deleteMany({ _id: { $in: existingIds } })
}
