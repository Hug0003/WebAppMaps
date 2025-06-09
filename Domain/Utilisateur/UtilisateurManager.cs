using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Domain
{
    public class UtilisateurManager : IUtilisateurManager
    {

        private readonly IRepository<Utilisateur> _utilisateurRepository;

        public UtilisateurManager(IRepository<Utilisateur> utilisateurRepository)
        {
            _utilisateurRepository = utilisateurRepository;
        }

        public async Task<Utilisateur> GetUserId(string email)
        {
            return await _utilisateurRepository.GetAll()
                       .FirstOrDefaultAsync(u => u.EmailUtilisateur == email);
        }



    }
}
