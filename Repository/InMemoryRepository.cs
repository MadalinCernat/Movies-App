using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using MoviesAPI.Repository;

namespace MoviesAPI.Repository
{
    public class InMemoryRepository<T> : IRepository<T>
    {
        private readonly List<T> _items;

        public InMemoryRepository(IEnumerable<T> initialItems)
        {
            _items = new List<T>(initialItems);
        }

        public IEnumerable<T> GetAll()
        {
            return _items;
        }

        public T GetById(string id)
        {
            return _items.FirstOrDefault(item => item.GetType().GetProperty("Id")?.GetValue(item, null)?.ToString() == id);
        }

        public void Add(T item)
        {
            _items.Add(item);
        }

        public void Update(string id, T updatedItem)
        {
            var index = _items.FindIndex(item => item.GetType().GetProperty("Id")?.GetValue(item, null)?.ToString() == id);
            if (index != -1)
            {
                _items[index] = updatedItem;
            }
            else
            {
                throw new KeyNotFoundException($"Movie with id {id} not found.");
            }
        }

        public void Delete(string id)
        {
            var itemToRemove = _items.FirstOrDefault(item => item.GetType().GetProperty("Id")?.GetValue(item, null)?.ToString() == id);
            if (itemToRemove != null)
            {
                _items.Remove(itemToRemove);
            }
            else
            {
                throw new KeyNotFoundException($"Movie with id {id} not found.");
            }
        }

        public T GetById(string id, params Expression<Func<T, object>>[] includes)
        {
            throw new NotImplementedException();
        }
    }
}