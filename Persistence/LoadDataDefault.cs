using Domain;

namespace Persistence
{
    public class LoadDataDefault
    {
        public static async Task LoadData(DataContext context)
        {
            if (context.Categories.Any()) return;

            var categories = new List<Category>
            {
                new() {Description = "Electronics"},
                new() {Description = "Fashion"},
                new() {Description = "Home & Kitchen"}
            };

            if (context.Products.Any()) return;
            
            var products = new List<Product>
            {
                    new() {
                        ProductCode = "EOCS-0001",
                        Title = "Dune",
                        Description = "Dune from frank herbert",
                        Price = 50,
                        ImageUrl = "/assets/productImages/book.png"
                    },
                    new() {
                        ProductCode = "EOCS-0002",
                        Title = "Blue Pencil",
                        Description = "Kilometrico pencil blue an glue",
                        Price = 1,
                        ImageUrl = "/assets/productImages/BluePencil.png"
                    },
                    new() {
                        ProductCode = "EOCS-0003",
                        Title = "Asus Laptop",
                        Description = "laptop for work and gaming, intel core i7 rtx 4000",
                        Price = 900,
                        ImageUrl = "/assets/productImages/Rog.png"
                    },

                    new() {
                        ProductCode = "EOCS-0004",
                        Title = "IPhone 15",
                        Description = "Iphone 15 6 gb ram ",
                        Price = 1000,
                        ImageUrl = "/assets/productImages/Iphone15.png"
                    },
                        new() {
                        ProductCode = "EOCS-0005",
                        Title = "Iphone 14",
                        Description = "Iphone 15 6 gb ram ",
                        Price = 900,
                        ImageUrl = "/assets/productImages/Iphone14.png"
                    },
                        new() {
                        ProductCode = "EOCS-0006",
                        Title = "Iphone 13",
                        Description = "Iphone 13 the best iphone",
                        Price = 700,
                        ImageUrl = "/assets/productImages/Iphone14.png"
                    },
                        new() {
                        ProductCode = "EOCS-0007",
                        Title = "Clean Code",
                        Description = "developer book from uncle bob",
                        Price = 10,
                        ImageUrl = "/assets/productImages/bookClean.png"
                    },
                    new() {
                        ProductCode = "EOCS-0008",
                        Title = "Clean architecture",
                        Description = "developer book from uncle bob",
                        Price = 10,
                        ImageUrl = "/assets/productImages/bookCleanarch.png"
                    },
                        new() {
                        ProductCode = "EOCS-0009",
                        Title = "Pragmatic programmer",
                        Description = "pragmatic in development is all, don complicate yourserf coding",
                        Price = 5,
                        ImageUrl = "/assets/productImages/Pragmatic.png"
                    },
                    new() {
                        ProductCode = "EOCS-0010",
                        Title = "Ipad pro 11",
                        Description = "tablet for work and school",
                        Price = 5,
                        ImageUrl = "/assets/productImages/Ipad.png"
                    },
                    new() {
                        ProductCode = "EOCS-0011",
                        Title = "Samsung Tablet",
                        Description = "tablet for work and school",
                        Price = 100,
                        ImageUrl = "/assets/productImages/samsung.png"
                    },
                        new() {
                        ProductCode = "EOCS-0012",
                        Title = "Logitech mx mouse",
                        Description = "mouse for gaming with 17000 dpi",
                        Price = 100,
                        ImageUrl = "/assets/productImages/mouse.png"
                    },
                    new() {
                        ProductCode = "EOCS-0013",
                        Title = "PS4 Console",
                        Description = "Ps4 Console, with one control",
                        Price = 100,
                        ImageUrl = "/assets/productImages/ps4.png"
                    },
                    new() {
                        ProductCode = "EOCS-0014",
                        Title = "PS5 Console",
                        Description = "Ps5 Console, with one control",
                        Price = 100,
                        ImageUrl = "/assets/productImages/ps5.png"
                    },
                    new() {
                        ProductCode = "EOCS-0015",
                        Title = "xbox one ",
                        Description = "xbox Console, with one control",
                        Price = 100,
                        ImageUrl = "/assets/productImages/xboxone.png"
                    },
                    new() {
                        ProductCode = "EOCS-0015",
                        Title = "xbox one series x ",
                        Description = "xbox Console, with one control",
                        Price = 100,
                        ImageUrl = "/assets/productImages/xboxonex.png"
                    },
                    new() {
                        ProductCode = "EOCS-0015",
                        Title = "xbox one series s ",
                        Description = "xbox Console, with one control",
                        Price = 100,
                        ImageUrl = "/assets/productImages/xboxones.png"
                    }
            };

            var customers = new List<Customer>
            {
                new() { Email = "jgb8525@gmail.com",Name= "Jimmy García"}
            };

            Random numberGenerator = new();
            var productCategories = new List<ProductCategory>();
            var productStock = new List<ProductStock>();

            foreach (var product in products)
            {
                for (int i = 0; i < 5; i++)
                {
                    productStock.Add(new ProductStock
                    {
                        Product = product,
                        SerialNumber = "AAAA-" + numberGenerator.Next(),
                        BatchCode = "K00-" + numberGenerator.Next(),
                        Status = "S"
                    });
                }
                foreach (var category in categories)
                {
                    productCategories.Add(
                        new ProductCategory
                        {
                            Product = product,
                            Category = category,
                        }
                    );
                }

            }

            await context.Categories.AddRangeAsync(categories);
            await context.Products.AddRangeAsync(products);
            await context.Customers.AddRangeAsync(customers);
            await context.ProductCategories.AddRangeAsync(productCategories);
            await context.ProductStock.AddRangeAsync(productStock);
            await context.SaveChangesAsync();
        }
    }
}