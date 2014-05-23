using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;

namespace Ortoba.Data
{
    public class ApiManagement
    {
        private ApiManagement()
        {
            
        }

        public static ApiManagement Instance
        {
            get
            {
                if (s_instance == null)
                {
                    s_instance = new ApiManagement();
                }
                return s_instance;
            }
        }

        public IList<Team> GetTeams(string url)
        {
            return this.GetTeamsAsync(url).Result.ToList();
        }

        private async Task<Team[]> GetTeamsAsync(string url)
        {
            HttpClient http = new HttpClient();

            var response = await http.GetStringAsync(url);

            return JsonConvert.DeserializeObject<Team[]>(response);
        }

        private static ApiManagement s_instance = null;
    }
}
