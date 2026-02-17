import type { Connection } from "mongoose"
import { Types } from "mongoose"

import { FlashSaleModel } from "../modules/flashSale/flashSale.model"
import { ProductModel } from "../modules/product/product.model"

type ProductSeed = {
  name: string
  description: string
  imageUrl: string
  totalStock: number
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
        description: "Pocket-sized ANC earbuds with 30-hour battery life",
        imageUrl: "https://images.example.com/products/aurora-buds.jpg",
        totalStock: 60,
      },
      {
        name: "Lumen Fitness Band",
        description: "Sleep, stress, and VO2 tracking in one band",
        imageUrl: "https://images.example.com/products/lumen-band.jpg",
        totalStock: 70,
      },
      {
        name: "Pulse Mini Drone",
        description: "Indoor-friendly drone with 4K stabilised camera",
        imageUrl: "https://images.example.com/products/pulse-drone.jpg",
        totalStock: 35,
      },
      {
        name: "Nimbus Portable Charger",
        description: "20k mAh PD power bank that fits anywhere",
        imageUrl: "https://images.example.com/products/nimbus-charger.jpg",
        totalStock: 80,
      },
      {
        name: "Solstice Smart Mug",
        description: "Self-heating ceramic mug with mobile presets",
        imageUrl: "https://images.example.com/products/solstice-mug.jpg",
        totalStock: 40,
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
        description: "Hot-swappable 65% board with gasket mount feel",
        imageUrl: "https://images.example.com/products/tempo-keyboard.jpg",
        totalStock: 45,
      },
      {
        name: "Orbit Travel Monitor",
        description: "Portable 14-inch OLED with dual USB-C",
        imageUrl: "https://images.example.com/products/orbit-monitor.jpg",
        totalStock: 50,
      },
      {
        name: "Quill Smart Pen",
        description: "Digitises notes across paper notebooks instantly",
        imageUrl: "https://images.example.com/products/quill-pen.jpg",
        totalStock: 65,
      },
      {
        name: "Flux Desk Mat",
        description: "Wireless charging vegan leather desk mat",
        imageUrl: "https://images.example.com/products/flux-mat.jpg",
        totalStock: 75,
      },
      {
        name: "Halo Conference Light",
        description: "Keylight with auto white balance for remote calls",
        imageUrl: "https://images.example.com/products/halo-light.jpg",
        totalStock: 55,
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
        description: "Solar-powered pathway system with mesh controls",
        imageUrl: "https://images.example.com/products/glow-lights.jpg",
        totalStock: 70,
      },
      {
        name: "Pulse Air Purifier Mini",
        description: "Compact purifier ideal for bedrooms and offices",
        imageUrl: "https://images.example.com/products/pulse-purifier.jpg",
        totalStock: 60,
      },
      {
        name: "Nestle Smart Diffuser",
        description: "App-controlled scent diffusion with schedules",
        imageUrl: "https://images.example.com/products/nestle-diffuser.jpg",
        totalStock: 45,
      },
      {
        name: "Mesa Ambient Speaker",
        description: "360-degree speaker with ambient light ring",
        imageUrl: "https://images.example.com/products/mesa-speaker.jpg",
        totalStock: 55,
      },
      {
        name: "Iris Doorbell Cam",
        description: "Battery doorbell camera with radar motion alerts",
        imageUrl: "https://images.example.com/products/iris-doorbell.jpg",
        totalStock: 50,
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
        description: "4K60 external capture with low-latency passthrough",
        imageUrl: "https://images.example.com/products/prism-capture.jpg",
        totalStock: 80,
      },
      {
        name: "Lyric Podcast Mic",
        description: "Broadcast mic with onboard DSP profiles",
        imageUrl: "https://images.example.com/products/lyric-mic.jpg",
        totalStock: 65,
      },
      {
        name: "Canvas Macro Pad",
        description: "Programmable 12-key pad with per-key displays",
        imageUrl: "https://images.example.com/products/canvas-macro.jpg",
        totalStock: 70,
      },
      {
        name: "Halo Stream Bar",
        description: "RGB light bar synced to OBS scenes",
        imageUrl: "https://images.example.com/products/halo-bar.jpg",
        totalStock: 75,
      },
      {
        name: "Vibe Studio Headphones",
        description: "Reference cans with planar magnetic drivers",
        imageUrl: "https://images.example.com/products/vibe-headphones.jpg",
        totalStock: 55,
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
        description: "Waterproof speaker with detachable solar lid",
        imageUrl: "https://images.example.com/products/boulder-speaker.jpg",
        totalStock: 60,
      },
      {
        name: "Atlas Trail Watch",
        description: "Dual-band GPS watch with offline topo maps",
        imageUrl: "https://images.example.com/products/atlas-watch.jpg",
        totalStock: 50,
      },
      {
        name: "Summit Power Lantern",
        description: "Rechargeable lantern that doubles as power bank",
        imageUrl: "https://images.example.com/products/summit-lantern.jpg",
        totalStock: 65,
      },
      {
        name: "Glide Travel Scooter",
        description: "Foldable e-scooter ideal for campgrounds",
        imageUrl: "https://images.example.com/products/glide-scooter.jpg",
        totalStock: 35,
      },
      {
        name: "Terra Purifier Bottle",
        description: "UV-C water bottle with motion reminders",
        imageUrl: "https://images.example.com/products/terra-bottle.jpg",
        totalStock: 80,
      },
    ],
  },
]

const ONE_HOUR_IN_MS = 60 * 60 * 1000

const buildFlashSalesPayload = () => {
  const baseStart = new Date()
  baseStart.setMinutes(0, 0, 0)

  return flashSaleSeedData.map((seed) => {
    const saleId = new Types.ObjectId()
    const startTime = new Date(baseStart.getTime() + seed.offsetHours * ONE_HOUR_IN_MS)
    const endTime = new Date(startTime.getTime() + seed.durationHours * ONE_HOUR_IN_MS)
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
      description: product.description,
      imageUrl: product.imageUrl,
      totalStock: product.totalStock,
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
