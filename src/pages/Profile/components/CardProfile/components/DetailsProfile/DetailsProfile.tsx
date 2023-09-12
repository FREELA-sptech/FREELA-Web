import React from "react";
import { Box, Skeleton, Avatar, AvatarGroup } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import HtmlTooltip from "../../../../../../shared/tools/MuiTooltipCustom";

interface DetailsProfileProps {
  loading: boolean;
  name: string;
  city: string;
  uf: string;
  description: string;
  subCategories: { name: string }[];
  isFreelancer: boolean;
}

const DetailsProfile: React.FC<DetailsProfileProps> = ({
  loading,
  name,
  city,
  uf,
  description,
  subCategories,
  isFreelancer,
}) => {
  return (
    <Box>
      {loading ? (
        <>
          <Skeleton width={200} height={50} />
          <Skeleton width={150} height={20} />
          <Skeleton width={650} height={30} />
          <h1 className="text-color f-18 f-inter fw-bold mt-2">
            Minhas Especialidades
          </h1>
          <Skeleton width={350} height={60} />
        </>
      ) : (
        <>
          <Box className="d-flex align-items-end gap-2">
            <span className="f-30 f-inter dark-contrast-color fw-bold">
              {name}
            </span>
            {/* <Box className="h-100 d-flex flex-row align-items-center pb-2">
              <span className="aditional-color f-16">{rate}</span>
              <StarIcon color="primary" sx={{ fontSize: '12px' }} />
            </Box> */}
          </Box>
          <Box>
            <span className="text-color fw-normal f-poppings aditional-color">
              {city}, {uf}
            </span>
          </Box>
          {isFreelancer ? (
            <span className="py-3 f-poppings aditional-color f-16">
              "{description}"
            </span>
          ) : null}
          <h1 className="text-color f-18 f-inter fw-bold mt-3">
            {isFreelancer ? "Minhas Especialidades" : "Meus Interesses"}
          </h1>
          <Box className="w-auto d-flex flex-wrap gap-2">
            <AvatarGroup max={500} className="d-flex">
              {subCategories &&
                subCategories.map((categories: any) => (
                  <HtmlTooltip
                    key={categories.name}
                    title={
                      <h1
                        key={categories.name}
                        style={{ borderRadius: "10px" }}
                        className="px-3 m-0 tooltip fw-bold"
                      >
                        {categories.name}
                      </h1>
                    }
                    placement="top"
                    PopperProps={{
                      sx: {
                        padding: 0,
                      },
                      disablePortal: true,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#274C77",
                        border: "4px solid white",
                      }}
                      alt={categories.name}
                      src={`data:image/png;base64,asdasd`}
                    />
                  </HtmlTooltip>
                ))}
            </AvatarGroup>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DetailsProfile;
