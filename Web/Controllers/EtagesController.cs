using Azure;
using Domain;
using Infrastructure;
using Infrastructure.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Threading.Tasks;
using Web.Models;
using Web.ViewModel;
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
