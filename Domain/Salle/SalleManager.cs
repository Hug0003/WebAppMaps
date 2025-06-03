using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    public class SalleManager : ISalleManager
    {

        private readonly IRepository<Salle> _salleRepository;

        public SalleManager(IRepository<Salle> salleRepository)
        {
            _salleRepository = salleRepository;
        }

        public IQueryable<Salle> GetSalleByEtageId(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Salle> GetEtageByNumSalle(string input)
        {
            if (!string.IsNullOrEmpty(input) && char.IsDigit(input[0]))
            {
                int prefix = int.Parse(input[0].ToString());

                return _salleRepository.GetAll()
                    .Include(s => s.Etage)
                    .Where(s => s.Etage.Niveau == prefix);
            }

            return Enumerable.Empty<Salle>().AsQueryable();
        }


    }
}
