using Domain;

namespace Web.ViewModel
{
    public class SalleViewModel
    {
        public Salle salle {  get; set; }
        public ICollection<Etage> etages { get; set; }
        public Utilisateur utilisateur { get; set; }

    }
}
