using Azure;
using Domain;
using Infrastructure;
using Infrastructure.Migrations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Web.Models;
using Web.ViewModel;
namespace Web.Controllers
{
    public class EtagesController : Controller
    {

        private readonly IRepository<Etage> _etageRepository;
        private readonly IRepository<Salle> _salleRepository;
        private readonly IRepository<Utilisateur> _utilisateurRepository;
        private readonly ISalleManager _salleManager;


        public EtagesController(IRepository<Etage> etageRepository, IRepository<Salle> salleRepository, IRepository<Utilisateur> utilisateurRepository, ISalleManager salleManager)
        {
            _etageRepository = etageRepository;
            _salleRepository = salleRepository;
            _utilisateurRepository = utilisateurRepository;

            _salleManager = salleManager;
        }

        public IActionResult SearchRoom()
        {
            var viewModel = new SalleViewModel
            {
                salle = null,
                etages = _etageRepository.GetAll().ToList(),
                utilisateur = null

            };

            return View("SearchRoom", viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> FormSearchRoom(string salle)
        {
            var viewModel = new SalleViewModel
            {
                salle = null,
                etages = _etageRepository.GetAll().ToList()
            };

            if (int.TryParse(salle.ToString(), out int numeroSalle) == false)
            {
               //viewModel = new SalleViewModel
               // {
               //     salle = await _salleManager.GetSalleByNameAsync(salle.ToString()),
               //     etages = _etageRepository.GetAll().ToList()
               // };
               // if (viewModel.salle == null)
               // {
               //     ModelState.AddModelError("salle", "La salle n'existe pas.");
               //     return View("SearchRoom", viewModel);
               // }
               
            }
            else
            {
                viewModel = new SalleViewModel
                {
                    salle = await _salleManager.GetSalleByNumeroAsync(numeroSalle),
                    etages = _etageRepository.GetAll().ToList()
                };
                if (viewModel.salle == null)
                {
                    ModelState.AddModelError("salle", "La salle n'existe pas.");
                    return View("SearchRoom", viewModel);
                }
            }
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

        public IActionResult SignalerRoom()
        {
            return View();
        }

        public void SendEmail(string subject, string body)
        {
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("hugomeuriel@gmail.com", "btzq mcia ryxw ongv"),
                EnableSsl = true
            };
            var message = new MailMessage("hugomeuriel@gmail.com", "hugomeuriel@gmail.com")
            {
                Subject = subject,
                Body = body
            };
            smtp.Send(message);

        }

        public IActionResult Signaler(string salle, string probleme)
        {
            SendEmail("Signal : " + salle, probleme);
            return SearchRoom();
        }



    }
}
