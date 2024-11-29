using CsvHelper;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Interfaces;
using WebApplication1.Models;

namespace Backend.Repositories
{
    public class GovernmentEntityRepository : IGovernmentEntityRepository
    {
        private readonly string _csvFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "government_entities.csv");

        public async Task<IEnumerable<GovernmentEntity>> GetAllEntitiesAsync()
        {
            using (var reader = new StreamReader(_csvFilePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<GovernmentEntity>().ToList();
                return records;
            }
        }

        public async Task<GovernmentEntity> GetEntityByIdAsync(int governmentEntityId)
        {
            using (var reader = new StreamReader(_csvFilePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<GovernmentEntity>().ToList();
                return records.FirstOrDefault(e => e.GovernmentEntityId == governmentEntityId);
            }
        }

        public async Task<GovernmentEntity> CreateEntityAsync(GovernmentEntity entity)
        {
            // Obtener todas las entidades existentes
            var entities = (await GetAllEntitiesAsync()).ToList();

            // Asignar un nuevo ID
            var newId = entities.Any() ? entities.Max(e => e.GovernmentEntityId) + 1 : 1;
            entity.GovernmentEntityId = newId;

            // Verificar si el archivo existe y si tiene contenido
            var fileExists = File.Exists(_csvFilePath);

            // Escribir la nueva entidad en el archivo CSV
            using (var writer = new StreamWriter(_csvFilePath, append: true))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                // Si el archivo no existe o está vacío, escribir los encabezados
                if (!fileExists || new FileInfo(_csvFilePath).Length == 0)
                {
                    csv.WriteHeader<GovernmentEntity>();
                    writer.WriteLine(); // Añadir una línea vacía después de los encabezados
                }

                csv.WriteRecord(entity);
                writer.WriteLine(); // Añadir una nueva línea después de cada registro
            }

            return entity;
        }

        public async Task<bool> UpdateEntityAsync(GovernmentEntity entity)
        {
            var entities = (await GetAllEntitiesAsync()).ToList();
            var index = entities.FindIndex(e => e.GovernmentEntityId == entity.GovernmentEntityId);

            if (index == -1)
                return false;

            entities[index] = entity;

            using (var writer = new StreamWriter(_csvFilePath))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(entities);
            }

            return true;
        }

        public async Task<bool> DeleteEntityAsync(int governmentEntityId)
        {
            var entities = (await GetAllEntitiesAsync()).ToList();
            var entityToRemove = entities.FirstOrDefault(e => e.GovernmentEntityId == governmentEntityId);

            if (entityToRemove == null)
                return false;

            entities.Remove(entityToRemove);

            using (var writer = new StreamWriter(_csvFilePath))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(entities);
            }

            return true;
        }
    }
}
