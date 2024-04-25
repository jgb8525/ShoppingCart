using AutoMapper;
using Domain;

namespace Application.Transversal
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, Product>();
        }
    }
}