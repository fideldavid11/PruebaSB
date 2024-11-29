using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace Backend.Interfaces
{
    public interface IGovernmentEntityRepository
    {
        Task<IEnumerable<GovernmentEntity>> GetAllEntitiesAsync();
        Task<GovernmentEntity> GetEntityByIdAsync(int governmentEntityId);
        Task<GovernmentEntity> CreateEntityAsync(GovernmentEntity entity);
        Task<bool> UpdateEntityAsync(GovernmentEntity entity);
        Task<bool> DeleteEntityAsync(int governmentEntityId);
    }
}
