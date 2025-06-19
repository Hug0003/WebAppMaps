using Azure;
using Domain;
using Infrastructure;
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

        public EtagesController(IRepository<Etage> etageRepository, 
            IRepository<Salle> salleRepository, 
            IRepository<Utilisateur> utilisateurRepository, 
            ISalleManager salleManager)
        {
            _etageRepository = etageRepository;
            _salleRepository = salleRepository;
            _utilisateurRepository = utilisateurRepository;
            _salleManager = salleManager;
        }

        public IActionResult Create()
        {
            return View();
        }

        #region Affiche Salle && Etage

        public IActionResult SearchRoom()
        {
            var viewModel = new SalleViewModel
            {
                salles = _salleRepository.GetAll().ToList(),
                etages = _etageRepository.GetAll().ToList(),

            };

            return View("SearchRoom", viewModel);
        }
            

    
        #endregion



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
                var assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets/PlansEtages/");

                // Chemin complet du fichier
                var filePath = Path.Combine(assetsPath, ImgPlanEtagePath.FileName);
                

                // Sauvegarde du fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await ImgPlanEtagePath.CopyToAsync(stream);
                }

                // Création de l'objet Etage et ajout à la base de données
                var etage = new Etage { Niveau = Niveau, Nom = Nom, ImgPlanEtagePath = "assets/PlansEtages/" + ImgPlanEtagePath.FileName };
                await _etageRepository.AddAsync(etage);
                await _etageRepository.SaveChangeAsync();
            }

            return RedirectToAction(nameof(SearchRoom));
        }

        // -------------------------------------- Created Salle -----------------------------------------


        public IActionResult CreateSalle()
        {
            ViewBag.EtageId = _etageRepository.GetAll().ToList();
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> CreateSalle(
        int Numero,
        string Nom,
        int EtageId,
        IFormFile ImgSallePath,
        TypeSalle TypeSalle,
        // Coordonnées sur le plan
        double? CoordonneeX = null,
        double? CoordonneeY = null,
        // Paramètres pour SalleReunion
        bool Ecran = false,
        bool Camera = false,
        bool TableauBlanc = false,
        bool SystemeAudio = false,
        // Paramètres pour SallePause
        int MicroOndes = 0,
        bool Frigo = false,
        int Evier = 0,
        bool Distributeur = false,
        int NbTables = 0,
        int NbChaises = 0,
        // Paramètres pour SalleBubble
        bool PriseElectrique = false)
        {
            string imagePath = "assets/Salles/ImageSalle_444.jpg";

            if (ImgSallePath != null && ImgSallePath.Length > 0)
            {
                var assetsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets/Salles/");
                var filePath = Path.Combine(assetsPath, ImgSallePath.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await ImgSallePath.CopyToAsync(stream);
                }
                imagePath = "assets/Salles/" + ImgSallePath.FileName;
            }

            Salle salle = TypeSalle switch
            {
                TypeSalle.Reunion => new SalleReunion
                {
                    Numero = Numero,
                    Nom = Nom,
                    EtageId = EtageId,
                    ImgSallePath = imagePath,
                    TypeSalle = TypeSalle,
                    CoordonneeX = CoordonneeX,
                    CoordonneeY = CoordonneeY,
                    Ecran = Ecran,
                    Camera = Camera,
                    TableauBlanc = TableauBlanc,
                    SystemeAudio = SystemeAudio,
                },
                TypeSalle.Pause => new SallePause
                {
                    Numero = Numero,
                    Nom = Nom,
                    EtageId = EtageId,
                    ImgSallePath = imagePath,
                    TypeSalle = TypeSalle,
                    CoordonneeX = CoordonneeX,
                    CoordonneeY = CoordonneeY,
                    MicroOndes = MicroOndes,
                    Frigo = Frigo,
                    Evier = Evier,
                    Distributeur = Distributeur,
                    NbTables = NbTables,
                    NbChaises = NbChaises
                },
                TypeSalle.Bubble => new SalleBubble
                {
                    Numero = Numero,
                    Nom = Nom,
                    EtageId = EtageId,
                    ImgSallePath = imagePath,
                    TypeSalle = TypeSalle,
                    CoordonneeX = CoordonneeX,
                    CoordonneeY = CoordonneeY,
                    PriseElectrique = PriseElectrique,
                },
                _ => new Salle
                {
                    Numero = Numero,
                    Nom = Nom,
                    EtageId = EtageId,
                    ImgSallePath = imagePath,
                    TypeSalle = TypeSalle,
                    CoordonneeX = CoordonneeX,
                    CoordonneeY = CoordonneeY
                }
            };

            await _salleRepository.AddAsync(salle);
            await _salleRepository.SaveChangeAsync();

            return RedirectToAction(nameof(SearchRoom));
        }



        // -------------------------------------- Signaler  -----------------------------------------

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
