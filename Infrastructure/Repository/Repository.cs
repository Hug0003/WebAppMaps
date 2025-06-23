using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        private WebAppMapsContext _context;
        private DbSet<TEntity> _dbSet;

        public Repository(WebAppMapsContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }
        public async Task AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }

        public Task FindAsync(int idEtageDel)
        {
            throw new NotImplementedException();
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet.Where(e => !e.IsDeleted);
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await GetAll().FirstOrDefaultAsync(e => e.Id == id);
        }


        

        public async Task SaveChangeAsync()
        {
            await _context.SaveChangesAsync();
        }


    }
}