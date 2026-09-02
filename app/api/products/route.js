import { NextResponse } from "next/server";
import { getAdminUser } from "@/app/lib/getUser";
import { connectDB } from "@/app/lib/mongodb";

import Product from "@/app/model/Product";
import Category from "@/app/model/Category";
import Brand from "@/app/model/Brand";

export async function POST(request) {
  try {
    const { user, status } = await getAdminUser(request);

    if (!user) {
      if (status === 401) {
        return NextResponse.json(
          {
            message: "Unauthorized",
          },
          {
            status: 401,
          },
        );
      }

      return NextResponse.json(
        {
          message: "Forbidden - Admin access required",
        },
        {
          status: 403,
        },
      );
    }

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
    const brand = searchParams.get("brand");
    const gender = searchParams.get("gender");
    const search = searchParams.get("search");

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const sort = searchParams.get("sort");

    let page = Number(searchParams.get("page")) || 1;
    let limit = Number(searchParams.get("limit")) || 12;

    // Pagination validation
    if (!Number.isInteger(page) || page < 1) {
      page = 1;
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      limit = 12;
    }

    // Price validation
    if (minPrice !== null) {
      const min = Number(minPrice);

      if (!Number.isFinite(min) || min < 0) {
        return NextResponse.json(
          {
            message: "Invalid minPrice",
          },
          {
            status: 400,
          },
        );
      }
    }

    if (maxPrice !== null) {
      const max = Number(maxPrice);

      if (!Number.isFinite(max) || max < 0) {
        return NextResponse.json(
          {
            message: "Invalid maxPrice",
          },
          {
            status: 400,
          },
        );
      }
    }

    // minPrice must not be greater than maxPrice
    if (
      minPrice !== null &&
      maxPrice !== null &&
      Number(minPrice) > Number(maxPrice)
    ) {
      return NextResponse.json(
        {
          message: "minPrice cannot be greater than maxPrice",
        },
        {
          status: 400,
        },
      );
    }

    const filter = {};

    // Brand filter
    if (brand) {
      const brandDoc = await Brand.findOne({
        slug: brand,
      });

      if (!brandDoc) {
        return NextResponse.json({
          products: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        });
      }

      filter.brand = brandDoc._id;
    }

    // Category filter
    if (category) {
      const categoryDoc = await Category.findOne({
        slug: category,
      });

      if (!categoryDoc) {
        return NextResponse.json({
          products: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        });
      }

      filter.category = categoryDoc._id;
    }

    // Gender filter
    if (gender) {
      filter.gender = gender;
    }

    // Search
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Price filter
    if (minPrice !== null || maxPrice !== null) {
      filter.price = {};

      if (minPrice !== null) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== null) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Sorting
    let sortOption = {};

    if (sort === "price-asc") {
      sortOption = {
        price: 1,
      };
    }

    if (sort === "price-desc") {
      sortOption = {
        price: -1,
      };
    }

    // Total products
    const total = await Product.countDocuments(filter);

    const totalPages = Math.ceil(total / limit);

    // Pagination
    const skip = (page - 1) * limit;

    // Get products
    const products = await Product.find(filter)
      .populate("category")
      .populate("brand")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch products",
      },
      {
        status: 500,
      },
    );
  }
}
