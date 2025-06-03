using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Threading.Tasks;
using Web.Models;
namespace Web.Controllers
{
    public class EtagesController : Controller
    {

        private readonly IRepository<Etage> _etageRepository;
        private readonly ISalleManager _salleManager;


        public EtagesController ( IRepository<Etage> etageRepository, ISalleManager salleManager)
        {
            _etageRepository = etageRepository;
            _salleManager = salleManager;
        }

        public IActionResult SearchEtage()
        {
            return View("SearchEtage");
        }

        [HttpPost]
        public async Task<IActionResult> FormSearchEtage(string niveau)
        {

            var salles = _salleManager.GetEtageByNumSalle(niveau);

            if (salles == null)
            {
                ViewBag.Message = "Aucune salle trouvée pour cet étage.";
                return View("SearchEtage", null);
            }

            // Optionnel : récupérer l'étage à afficher avec les salles
            var etage = await _etageRepository.GetAll()
                .FirstOrDefaultAsync(e => e.Niveau == int.Parse(niveau.ToString()[0].ToString()));

            ViewBag.Salles = salles.ToList();
            return View("SearchEtage", etage);
        }

        public IActionResult Index()
        {
            var etages = _etageRepository.GetAll();
            return View(etages);
        }


        public IActionResult Create()
        {
            return View();
        }  

        [HttpPost] //à l'envoie des data ( submit ) 
        public async Task<IActionResult> Create([Bind("Niveau, Nom")] Etage etage)  //attent ces 2 columns de la class Etage
        {
            //ajoute a la base de donnée
            await _etageRepository.AddAsync(etage);
            //sauvegarde la base de donnée
            await _etageRepository.SaveChangeAsync();
            //redirection de la page apres l'envoie ( vers la page nommée Index )
            return RedirectToAction(nameof(Index));
        }

    }
}
