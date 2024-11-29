using Backend.Interfaces;
using Backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios al contenedor

// Registra el repositorio para las entidades gubernamentales
builder.Services.AddSingleton<IGovernmentEntityRepository, GovernmentEntityRepository>();

// Configura el acceso a archivos CSV
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Configura los controladores de la API
builder.Services.AddControllers();

// Configura Swagger/OpenAPI para la documentación de la API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Politica", app =>
    {
        app.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configura el pipeline de solicitudes HTTP

if (app.Environment.IsDevelopment())
{
    // Habilita Swagger en desarrollo
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirige HTTP a HTTPS
app.UseHttpsRedirection();

// Aplica la política de CORS
app.UseCors("Politica");

// Habilita la autorización
app.UseAuthorization();

// Configura las rutas para los controladores
app.MapControllers();

// Ejecuta la aplicación
app.Run();
