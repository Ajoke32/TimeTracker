using GraphQL;

namespace TimeTracker.Visitors;

public interface IGraphQlArgumentVisitor
{
    public IQueryable<TEntity> Visit<TEntity>(IQueryable<TEntity> entities,IResolveFieldContext context,bool withExtraInfo=true);
}