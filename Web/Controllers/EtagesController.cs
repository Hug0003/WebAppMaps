using Azure;
using Domain;
using Infrastructure;
using Infrastructure.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;
using System.Threading.Tasks;
using Web.Models;
using Web.ViewModel;
namespace Web.Controllers
{
    public class EtagesController : Controller
    {

        private readonly IRepository<Etage> _etageRepository;
        private readonly IRepository<Salle> _salleRepository;
        private readonly ISalleManager _salleManager;


        public EtagesController(IRepository<Etage> etageRepository, IRepository<Salle> salleRepository, ISalleManager salleManager)
        {
            _etageRepository = etageRepository;
            _salleRepository = salleRepository;
            _salleManager = salleManager;
        }

        public IActionResult SearchRoom()
        {
            var viewModel = new SalleViewModel
            {
                salle = null,
                etages = _etageRepository.GetAll().ToList()
            };

            return View("SearchRoom", viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> FormSearchRoom(int niveau)
        {
            var viewModel = new SalleViewModel
            {
                salle = await _salleManager.GetSalleByNumeroAsync(niveau),
                etages = _etageRepository.GetAll().ToList()
            };
            
            return View("SearchRoom", viewModel);

       
        }

     

        public IActionResult CreateEtage()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateEtage(int Niveau, string Nom, IFormFile ImgPlanEtagePath)
        {
            if (ImgPlanEtagePath != null && ImgPlanEtagePath.Length > 0)
            {
                // Chemin de base où les fichiers seront stockés
                var assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets");

                // Chemin complet du fichier
                var filePath = Path.Combine(assetsPath, ImgPlanEtagePath.FileName);

                // Sauvegarde du fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await ImgPlanEtagePath.CopyToAsync(stream);
                }

                // Création de l'objet Etage et ajout à la base de données
                var etage = new Etage { Niveau = Niveau, Nom = Nom, ImgPlanEtagePath = "assets/" + ImgPlanEtagePath.FileName };
                await _etageRepository.AddAsync(etage);
                await _etageRepository.SaveChangeAsync();
            }

            return RedirectToAction(nameof(SearchRoom));
        }



        public IActionResult CreateSalle()
        {
            ViewBag.EtageId = _etageRepository.GetAll().ToList();
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> CreateSalle(int Numero, string Nom, int EtageId, IFormFile ImgSallePath)
        {

            if(ImgSallePath != null && ImgSallePath.Length > 0)
            {

                var assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets");

                var filePath = Path.Combine(assetsPath, ImgSallePath.FileName);

                using(var stream = new FileStream(filePath, FileMode.Create))
                {
                    await ImgSallePath.CopyToAsync(stream);
                }

                var salle = new Salle
                {
                    Numero = Numero,
                    Nom = Nom,
                    EtageId = EtageId,
                    ImgSallePath = "assets/" + ImgSallePath.FileName
                };
                //ajoute a la base de donnée
                await _salleRepository.AddAsync(salle);
                //sauvegarde la base de donnée
                await _salleRepository.SaveChangeAsync();
            }

            return RedirectToAction(nameof(SearchRoom));
        }
    }
}
