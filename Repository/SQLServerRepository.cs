using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DatabaseContext;
using MoviesAPI.Models;
using MoviesAPI.Repository;

namespace MoviesAPI.Repository
{
    public class SqlServerRepository<T> : IRepository<T> where T : BaseEntity
    {
        private DbContext _context;
        private DbSet<T> _dbSet;

        public SqlServerRepository(DbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));

            _dbSet = context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(string id)
        {
            return _dbSet.Find(id);
        }

        public T GetById(string id, params Expression<Func<T, object>>[] includes)
        {
            var query = _dbSet.AsQueryable();
            query = query.Where(entity => entity.Id == id);
            foreach (var navigationProperty in includes)
            {
                query = query.Include(navigationProperty);
            }
            return query.FirstOrDefault();
        }

        public void Add(T item)
        {
            _dbSet.Add(item);
            _context.SaveChanges();
        }

        public void Update(string id, T updatedItem)
        {
            var existingItem = _dbSet.Find(id);
            if (existingItem != null)
            {
                _context.Entry(existingItem).CurrentValues.SetValues(updatedItem);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"Item with ID '{id}' not found.");
            }
        }

        public void Delete(string id)
        {
            var itemToDelete = _dbSet.Find(id);
            if (itemToDelete != null)
            {
                _dbSet.Remove(itemToDelete);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"Item with ID '{id}' not found.");
            }
        }
    }
}
