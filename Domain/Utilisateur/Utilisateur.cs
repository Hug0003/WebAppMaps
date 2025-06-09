using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Utilisateur : Entity
    {
        internal int Id;

        public string? NomUtilisateur { get; set; }
        public string? PrenomUtilisateur { get; set; }
        public string? EmailUtilisateur { get; set; }
        public string? MotDePasseUtilisateur { get; set; }
        public string? RoleUtilisateur { get; set; } // "Administrateur" ou "Utilisateur"
        public ICollection<Salle>? Salles { get; set; } = new List<Salle>();


    }
}
