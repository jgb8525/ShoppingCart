using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<ProductStock> ProductStock { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductCategory>(y => y.HasKey(yy => new { yy.ProductId, yy.CategoryId }));

            modelBuilder.Entity<ProductCategory>()
            .HasOne(u => u.Product)
            .WithMany(x => x.Categories)
            .HasForeignKey(f => f.CategoryId);

            modelBuilder.Entity<ProductCategory>()
           .HasOne(pc => pc.Category)
           .WithMany(c => c.Products)
           .HasForeignKey(pc => pc.CategoryId);

            modelBuilder.Entity<CustomerOrder>(y => y.HasKey(yy => new { yy.CustomerId, yy.OrderId }));

            modelBuilder.Entity<CustomerOrder>()
            .HasOne(u => u.Customer)
            .WithMany(x => x.Orders)
            .HasForeignKey(f => f.OrderId);

            modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany(p => p.OrderDetails)
            .HasForeignKey(od => od.ProductId);

            //foreign key between product and product stock
            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductStock)
                .WithOne(ps => ps.Product)
                .HasForeignKey(ps => ps.ProductId);
        }
    }
}