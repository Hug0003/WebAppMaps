using System.ComponentModel.DataAnnotations;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class UtilisateursController : Controller
    {



        private readonly IRepository<Utilisateur> _utilisateurRepository;


        public UtilisateursController( IRepository<Utilisateur> utilisateurRepository)
        {

            _utilisateurRepository = utilisateurRepository;

        }


        public IActionResult Signin()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> FormSignin(string Nom, string Prenom, string Email , string Role)
        {
            var utilisateur = new Utilisateur { NomUtilisateur = Nom, PrenomUtilisateur = Prenom, EmailUtilisateur = Email, RoleUtilisateur = Role };
            await _utilisateurRepository.AddAsync(utilisateur);
            await _utilisateurRepository.SaveChangeAsync();
            return RedirectToAction("SearchRoom", "Etages");

        }

    }
}
