using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public interface ISalleManager
    {
        IQueryable<Salle> GetSalleByEtageId(int id);
        IQueryable<Salle> GetEtageByNumSalle(string niveau);
    }
}
