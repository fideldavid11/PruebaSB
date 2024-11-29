using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Interfaces;
using WebApplication1.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GovernmentEntitiesController : ControllerBase
    {
        private readonly IGovernmentEntityRepository _governmentEntityRepository;

        public GovernmentEntitiesController(IGovernmentEntityRepository governmentEntityRepository)
        {
            _governmentEntityRepository = governmentEntityRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GovernmentEntity>>> GetAllEntities()
        {
            var entities = await _governmentEntityRepository.GetAllEntitiesAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GovernmentEntity>> GetEntityById(int id)
        {
            var entity = await _governmentEntityRepository.GetEntityByIdAsync(id);

            if (entity == null)
                return NotFound();

            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<GovernmentEntity>> CreateEntity([FromBody] GovernmentEntity entity)
        {
            var createdEntity = await _governmentEntityRepository.CreateEntityAsync(entity);
            return CreatedAtAction(nameof(GetEntityById), new { id = createdEntity.GovernmentEntityId }, createdEntity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEntity(int id, [FromBody] GovernmentEntity entity)
        {
            if (id != entity.GovernmentEntityId)
                return BadRequest();

            var result = await _governmentEntityRepository.UpdateEntityAsync(entity);

            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity(int id)
        {
            var result = await _governmentEntityRepository.DeleteEntityAsync(id);

            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
