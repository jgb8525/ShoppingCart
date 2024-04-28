using System.Net;
using System.Text.Json;
using Application.Transversal;

namespace API.Middleware
{
    public class HandleExceptionMiddleware(RequestDelegate next, ILogger<HandleExceptionMiddleware> logger, IHostEnvironment env)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<HandleExceptionMiddleware> _logger = logger;
        private readonly IHostEnvironment _env = env;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/json";
                _logger.LogError(ex, "Error message: {Message}", ex.Message);
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode, "Internal server error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }

        }
    }
}