"use client"

import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Play } from 'lucide-react';
import Image from '../image';
import { bgGradient } from '~/theme/css';
import DynamicContent, {type Handlebar} from "~/components/handlebar/text";
import RichText from "~/components/mui/richText";
import {type StrapiButton, type StrapiLink} from "~/types/strapi/global";
import Link from 'next/link';

type NextStrapiLink = Omit<StrapiLink, "children">

export type AugmentedStrapiButton = Omit<StrapiButton, "link" | "id" | "children"> & {
    onClick?: () => void;
    link?: NextStrapiLink;
}

type RichText = {
    richText: string;
} | undefined | string;

type HeroProps = {
    heading: string;
    handlebar?: Handlebar;
    backgroundImageUrl?: string;
    subheading?: string;
    description?: RichText;
    actions?: AugmentedStrapiButton[];
    primaryActionText?: string;
    secondaryActionText?: string;
    secondaryActionIcon?: React.ReactNode;
    imageSrc?: string;
}

const Hero = ({
    heading,
    handlebar,
    backgroundImageUrl,
    subheading,
    description,
    actions,
    primaryActionText,
    secondaryActionText,
    secondaryActionIcon,
    imageSrc,
}: HeroProps) => {
    const theme = useTheme();
    const richTextData = typeof description === 'object' && description?.richText
        ? JSON.parse(description.richText)
        : description;

    console.log(richTextData)

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: backgroundImageUrl ? alpha(theme.palette.background.default, 0.9) : 'transparent',
                    imgUrl: backgroundImageUrl || '/assets/background/overlay_1.jpg',
                }),
                overflow: 'hidden',
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    py: 5,
                    px: 4,
                    display: { md: 'flex' },
                    alignItems: { md: 'center' },
                    maxHeight: 800
                }}
            >
                <Grid container columnSpacing={{ xs: 0, md: 10 }}>
                    <Grid
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        {subheading && (
                            <Typography variant="overline" sx={{ color: 'secondary.main'}}>
                                {subheading}
                            </Typography>
                        )}

                        <DynamicContent
                            mappedValues={handlebar}
                            textInput={heading}
                        >
                            {(output) => (
                                <Typography variant="h1" sx={{ my: 3, lineHeight: 1.1  }}>
                                    {output}
                                </Typography>
                            )}
                        </DynamicContent>

                        {richTextData && <RichText data={richTextData}/>}

                        <Stack
                            spacing={3}
                            direction={{ xs: 'column', sm: 'row' }}
                            alignItems={{ xs: 'center', md: 'unset' }}
                            justifyContent={{ xs: 'center', md: 'unset' }}
                            sx={{ mt: 5 }}
                        >
                            {primaryActionText && (
                                <Button variant="contained" color="inherit" size="large">
                                    {primaryActionText}
                                </Button>
                            )}

                            {secondaryActionText && (
                                <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
                                    <Fab size="medium" sx={{ mr: 1 }}>
                                        {secondaryActionIcon || <Play />}
                                    </Fab>
                                    {secondaryActionText}
                                </Stack>
                            )}

                            {actions &&
                                <Stack direction="row" rowGap={2} flexWrap="wrap">
                                    {actions.map((button, index) => {
                                        const link = button?.link?.href ?? "#"
                                        const variant = button?.variant ?? (index > 0 ? "outlined" : "contained")
                                        const color = button?.color ?? (index > 0 ? "secondary" : "primary")

                                        return (
                                            <Link
                                                key={index}
                                                href={link}
                                                target={button?.link?.target ?? "_self"}
                                            >
                                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                                {/* @ts-ignore */}
                                                <Button
                                                    aria-label={`link to ${button?.link?.label}`}
                                                    size="large"
                                                    variant={variant}
                                                    color={color}
                                                    disabled={button?.disabled ?? false}
                                                    sx={{mr: 2}}
                                                    onClick={button?.onClick}
                                                >
                                                    {button?.link?.label}
                                                </Button>
                                            </Link>
                                        )
                                    })}
                                </Stack>
                            }
                        </Stack>
                    </Grid>

                    {imageSrc && (
                        <Grid xs={12} md={6} lg={6} sx={{display: {xs: "none", md: "block"}}}>
                            <Box
                                maxHeight={500}
                                display="flex"
                                overflow="hidden"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                                borderRadius={1}
                            >
                                <Box>
                                    <Image
                                        visibleByDefault
                                        disabledEffect
                                        alt="hero image"
                                        src={imageSrc}
                                        sx={{borderRadius:2, height: 500}}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
