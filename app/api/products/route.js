import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/model/Product";
import Category from "@/app/model/Category";
import Brand from "@/app/model/Brand";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create product",
      },
      {
        status: 500,
      },
    );
  }
}
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const gender = searchParams.get("gender");
    const search = searchParams.get("search");

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const sort = searchParams.get("sort");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    const filter = {};

    const brand = searchParams.get("brand");

    if (brand) {
      const brandDoc = await Brand.findOne({
        slug: brand,
      });

      if (!brandDoc) {
        return NextResponse.json([]);
      }

      filter.brand = brandDoc._id;
    }

    if (category) {
      const categoryDoc = await Category.findOne({
        slug: category,
      });

      if (!categoryDoc) {
        return NextResponse.json([]);
      }

      filter.category = categoryDoc._id;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

    if (sort === "price-asc") {
      sortOption = { price: 1 };
    }

    if (sort === "price-desc") {
      sortOption = { price: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("category")
      .populate("brand")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
