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

        public async Task<List<Salle>> GetSalleByEtageidAsync(int IdEtage)
        {
            // Fix: Use ToListAsync to materialize the IQueryable into a List asynchronously
            return await _salleRepository.GetAll()
                                         .Where(s => s.EtageId == IdEtage)
                                         .ToListAsync();
        }

        public async Task<Salle> GetSalleByNameAsync(string nomSalle)
        {
            return await _salleRepository.GetAll()
                            .Include(s => s.Etage) // ← charge aussi l'étage lié
                            .FirstOrDefaultAsync(s => s.Nom == nomSalle);
        }

        public async Task<Salle> GetSalleByNumeroAsync(int numeroSalle)
        {
            return await _salleRepository.GetAll()
                            .Include(s => s.Etage) // ← charge aussi l'étage lié
                            .FirstOrDefaultAsync(s => s.Numero == numeroSalle);
        }
    }
}
