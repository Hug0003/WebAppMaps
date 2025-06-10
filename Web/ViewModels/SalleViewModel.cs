using Domain;

namespace Web.ViewModel
{
    public class SalleViewModel
    {
        public Salle salle {  get; set; }
        public ICollection<Salle> salles { get; set; } = new List<Salle>();
        public ICollection<Etage> etages { get; set; }
        public Utilisateur utilisateur { get; set; }

    }
}
