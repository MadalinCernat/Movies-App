using System.Linq.Expressions;

namespace MoviesAPI.Repository
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T GetById(string id);
        T GetById(string id, params Expression<Func<T, object>>[] includes);
        void Add(T item);
        void Update(string id, T updatedItem);
        void Delete(string id);
    }
}
