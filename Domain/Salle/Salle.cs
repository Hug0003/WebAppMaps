using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Salle : Entity
    {
        public string Nom { get; set; }
        public int Numero { get; set; }
        public int? NbPlace { get; set; }
        public string? ImgSallePath { get; set; }
        public bool? Favori { get; set; }

        public double? CoordXTopLeft { get; set; }
        public double? CoordY1TopLeft { get; set; }
        public double? CoordX2BotRight { get; set; }
        public double? CoordY2BotRight { get; set; }

        public Etage Etage { get; set; }
        public int EtageId { get; set; }

        public Utilisateur? Utilisateur { get; set; }
        public int? UtilisateurId { get; set; }
    }
}

